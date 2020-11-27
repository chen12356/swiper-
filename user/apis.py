import logging
import os

from django.core.cache import cache

from common import stat
from common import keys
from libs.cache import rds
from libs.qn_cloud import upload_to_qiniu
from user import logics
from user.logics import save_avatar
from user.models import User
from user.models import Profile
from user.forms import UserForm
from user.forms import ProfileForm
from libs.http import render_json

inf_log = logging.getLogger('inf')


def get_vcode(request):
    '''获取短信验证码'''
    phonenum = request.GET.get('phonenum')
    status = logics.send_vcode(phonenum)
    if status:
        return render_json(status)
    else:
        raise stat.SendSmsErr
def submit_vcode(request):
    '''通过验证码登录、注册'''
    phonenum = request.POST.get('phonenum')
    vcode = request.POST.get('vcode')
    cached_vcode = cache.get(keys.VCODE_K % phonenum)  # 取出缓存的验证码
    print(cached_vcode)
    # 检查验证码是否正确
    if vcode and vcode == cached_vcode:
        try:
            user = User.objects.get(phonenum=phonenum)
            inf_log.info('%s login with id %s' % (user.nickname, user.id))
        except User.DoesNotExist:
            user = User.objects.create(phonenum=phonenum)  # 创建用户
            inf_log.info('new user: %s' % user.id)
        # 执行登陆过程
        request.session['uid'] = user.id
        return render_json(user.to_dict())
    else:
        raise stat.VcodeErr


def get_profile(request):
    '''获取个人资料'''
    uid = request.GET.get('uid')
    if not uid:
        uid = request.uid
    key = keys.PROFILE_K % uid
    result = rds.get(key)
    print('从缓存获取: %s' % result)
    if result is None:
        profile, _ = Profile.objects.get_or_create(id=uid)
        user_info= User.objects.get(id=uid).to_dict()
        print(User.objects.get(id=uid).nickname)
        profile_info = profile.to_dict()
        result = {**user_info,**profile_info}
        print('从数据库获取: %s' % result)

        rds.set(key, result, 1000)  # 将数据写入缓存
        print('将数据写入缓存')
    return render_json(result)


def set_profile(request):
    '''修改个人资料'''
    user_form = UserForm(request.POST)
    profile_form = ProfileForm(request.POST)

    # 检查数据有效性
    if not user_form.is_valid():
        raise stat.UserFormErr(user_form.errors)

    if not profile_form.is_valid():
        raise stat.ProfileFormErr(profile_form.errors)

    print('-----------------')
    print(user_form.cleaned_data)
    print(request.uid)
    # 保存数据
    User.objects.filter(id=request.uid).update(**user_form.cleaned_data)
    Profile.objects.filter(id=request.uid).update(**profile_form.cleaned_data)

    # 删除旧的缓存
    key = keys.PROFILE_K % request.uid
    model_user_key = 'Model-User-%s'%(request.uid)
    model_profile_key = 'Model-Profile-%s'%(request.uid)
    rds.delete(key)
    rds.delete(model_user_key)
    rds.delete(model_profile_key)
    #方法2
    # user = User.objects.get(id=request.uid)
    # user.__dict__.update(user_form.cleaned_data)
    # user.save()

    return render_json()



def upload_avatar_celery(request):
    '''
    头像上传

    1. 保存到本地
    2. 上传到七牛云
    3. 保存 URL
    4. 删除本地文件
    '''
    avatar_file = request.FILES.get('avatar')
    print('llei')
    logics.upload_avatar.delay(request.uid, avatar_file)
    return render_json()


def upload_avatar(request):
    print('xxxx')
    avatar_file = request.FILES.get('avatar')
    print('你来了？')
    print(avatar_file)
    filename, filepath = save_avatar(request.uid, avatar_file)  # 文件保存到本地
    print(filename, filepath)
    avatar_url = upload_to_qiniu(filename, filepath)  # 文件上传到七牛
    User.objects.filter(id=request.uid).update(avatar=avatar_url)  # 保存 URL
    # os.remove(filepath)  # 删除本地临时文件
    # 删除旧的缓存
    key = keys.PROFILE_K % request.uid
    model_user_key = 'Model-User-%s' % (request.uid)
    model_profile_key = 'Model-Profile-%s' % (request.uid)
    rds.delete(key)
    rds.delete(model_user_key)
    rds.delete(model_profile_key)
    return render_json()
# http://img.jj20.com/up/allimg/tx06/07112019921.jpg