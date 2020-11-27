from django.shortcuts import render

# Create your views here.
from common import keys
from libs.cache import rds
from libs.http import render_json
from user.models import User


def set_vip(request):
    vip_id = request.POST.get('vip_id') #获取vip 的id
    User.objects.filter(id=request.uid).update(vip_id=vip_id)

    # 删除旧缓存
    key = keys.PROFILE_K % request.uid
    model_user_key = 'Model-User-%s' % (request.uid)
    model_profile_key = 'Model-Profile-%s' % (request.uid)
    rds.delete(key)
    rds.delete(model_user_key)
    rds.delete(model_profile_key)
    return render_json()