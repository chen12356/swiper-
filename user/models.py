'''程序设计要有前瞻性，但是不要过早优化'''

import datetime

from django.db import models

from vip.models import Vip


class User(models.Model):
    SEX = (
        ('male', '男性'),
        ('female', '女性'),
    )
    LOCATION = (
        ("北京", "北京"),
        ("上海", "上海"),
        ("深圳", "深圳"),
        ("郑州", "郑州"),
        ("西安", "西安"),
        ("成都", "成都"),
        ("沈阳", "沈阳"),
        ("安阳", "安阳"),
        ("福州", "福州"),
        ("宁德", "宁德"),
    )
    phonenum = models.CharField(max_length=15, unique=True, verbose_name='手机号')
    nickname = models.CharField(max_length=20, default='匿名用户', verbose_name='昵称')
    gender = models.CharField(max_length=6, choices=SEX, default='female', verbose_name='性别')
    birthday = models.DateField(default='1990-01-01', verbose_name='生日')
    location = models.CharField(max_length=15, choices=LOCATION, default='上海', verbose_name='常居地')
    avatar = models.CharField(max_length=256, verbose_name='个人形象')

    vip_id = models.IntegerField(default=1, verbose_name='用户对应的会员 ID')
    vip_end = models.DateTimeField(default='3000-1-1', verbose_name='会员过期时间')

    class Meta:
        db_table = 'user'
    @property
    def profile(self):
        if not hasattr(self, '_profile'):
            self._profile, _ = Profile.objects.get_or_create(id=self.id)
        return self._profile

    @property
    def vip(self):
        if not hasattr(self, '_vip'):
            self._vip = Vip.objects.get(id=self.vip_id)
        return self._vip

    def is_vip_expired(self):
        '''检查自己的会员是否已经过期'''
        return datetime.datetime.now() >= self.vip_end


class Profile(models.Model):
    '''个人资料'''
    height = models.IntegerField(default=178, verbose_name='身高')
    age = models.IntegerField(default=22, verbose_name='本人年龄')
    describe = models.CharField(max_length=128, default='这个人很懒...什么都没有留下！！！', verbose_name='个人签名')
    married = models.CharField(max_length=8,  default='未婚', verbose_name='婚姻状况')
    edu = models.CharField(max_length=15, default='博士', verbose_name='学历')
    occu = models.CharField(max_length=36, default='保密', verbose_name='职业')
    figure = models.CharField(max_length=12, default='高挑型', verbose_name='体重')
    weight = models.IntegerField( default=45, verbose_name='身材')
    qq = models.IntegerField(default=1406159466, verbose_name='QQ')
    dating_gender = models.CharField(max_length=6, choices=User.SEX, default='female', verbose_name='匹配的性别')
    dating_location = models.CharField(max_length=15, choices=User.LOCATION, default='上海', verbose_name='目标城市')
    min_distance = models.IntegerField(default=1, verbose_name='最小查找范围')
    max_distance = models.IntegerField(default=10, verbose_name='最大查找范围')
    min_dating_age = models.IntegerField(default=18, verbose_name='最小交友年龄')
    max_dating_age = models.IntegerField(default=35, verbose_name='最大交友年龄')
    vibration = models.BooleanField(default=True, verbose_name='是否开启震动')
    only_matche = models.BooleanField(default=True, verbose_name='不让未匹配的人看我的相册')
    auto_play = models.BooleanField(default=True, verbose_name='自动播放视频')
    class Meta:
        db_table = 'profile'