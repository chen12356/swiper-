#!/usr/bin/env python

import os
import sys
import random
from datetime import date
from string import digits

import django

# 设置 Django 运行环境


from scripts.user_avatar import run

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "swiper.settings")
django.setup()
from django.db.models import Q
from user.models import User
from vip.models import Vip, Permission, VipPermRelation

last_names = (
    '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨'
    '朱秦尤许何吕施张孔曹严华金魏陶姜'
    '戚谢邹喻柏水窦章云苏潘葛奚范彭郎'
    '鲁韦昌马苗凤花方俞任袁柳酆鲍史唐'
    '费廉岑薛雷贺倪汤滕殷罗毕郝邬安常'
    '乐于时傅皮卞齐康伍余元卜顾孟平黄'
)

first_names = {
    'male': [
        '致远', '俊驰', '雨泽', '烨磊', '晟睿',
        '天佑', '文昊', '修洁', '黎昕', '远航',
        '旭尧', '鸿涛', '伟祺', '荣轩', '越泽',
        '浩宇', '瑾瑜', '皓轩', '浦泽', '绍辉',
        '绍祺', '升荣', '圣杰', '晟睿', '思聪'
    ],
    'female': [
        '沛玲', '欣妍', '佳琦', '雅芙', '雨婷',
        '韵寒', '莉姿', '雨婷', '宁馨', '妙菱',
        '心琪', '雯媛', '诗婧', '露洁', '静琪',
        '雅琳', '灵韵', '清菡', '溶月', '素菲',
        '雨嘉', '雅静', '梦洁', '梦璐', '惠茜',
        '清雅', '紫雪', '风柏',
        '雅翠', '寻丹', '凡菡',
        '盼语', '漪容', '蓉柳',
        '怜忆', '淇衿', '瑾岚',
        '紫绮', '淇玉', '雁儿',
        '歆梦', '柔岚', '曼枫',
        '涵紫', '霜丹', '菱巧',
        '黎晨', '柔梦', '凝萱',
        '诗雅', '妍兰', '柏双',
        '文涵', '羽安', '柳馨',
        '秋白', '慕沁', '萱烟',
        '初白', '怡妍', '语萱',
        '念梦', '墨茹', '欣瑶',
        '紫思', '荷枫', '凌忆',
        '怀沛', '雪梅', '思兰',
        '秋灵', '凝雁', '雪嫣',
    ]
}


def random_name():
    '''随机产生一个名字'''
    last_name = random.choice(last_names)
    # sex = random.choice(list(first_names.keys()))
    sex = 'female'   #设置为 女性
    first_name = random.choice(first_names[sex])
    return ''.join([last_name, first_name]), sex


def get_phone_number():
    pre_lst = ["130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "150",
               "151", "152", "153", "155", "156", "157", "158", "159", "186", "187", "188"]

    return random.choice(pre_lst) + ''.join(random.sample(digits, 8))


def create_robots(n):
    # 创建初始用户
    for i in range(n):
        name, sex = random_name()
        year = random.randint(1985, 2003)
        month = random.randint(1, 12)
        day = random.randint(1, 28)
        try:
            data = {
                # 'phonenum':random.randrange(10000000000, 18900000000),
                'phonenum': get_phone_number(),
                'nickname': name,
                'gender': sex,
                'birthday': date(year, month, day),
                'location': random.choice([item[0] for item in User.LOCATION]),
            }
            print(data)
            user = User.objects.update_or_create(
                nickname=data['nickname'],
                defaults=data
                # phonenum='%s' % random.randrange(21000000000, 21900000000),
                # nickname=name,
                # gender=sex,
                # birthday=date(year, month, day),
                # location=random.choice([item[0] for item in User.LOCATION]),
            )
            print('created: %s %s %s' % (user[0].id, name, sex))
        except django.db.utils.IntegrityError:
            pass


def init_permission():
    '''创建权限模型'''
    permissions = (
        ('vipflag', '会员身份标识'),
        ('superlike', '超级喜欢'),
        ('rewind', '反悔功能'),
        ('anylocation', '任意更改定位'),
        ('unlimit_like', '无限喜欢次数'),
        ('who_liked_me', '查看喜欢过我的人'),
    )

    for name, desc in permissions:
        perm, _ = Permission.objects.get_or_create(name=name, desc=desc)
        print('create permission %s' % perm.name)


def init_vip():
    duration = {
        0: 1000000,
        1: 60,
        2: 50,
        3: 30,
    }
    for i in range(4):
        vip, _ = Vip.objects.get_or_create(
            name='%d 级会员' % i,
            level=i,
            price=i * 10.0,
            days=duration[i]
        )
        print('create %s' % vip.name)


def create_vip_perm_relations():
    '''创建 Vip 和 Permission 的关系'''
    # 获取 VIP
    vip1 = Vip.objects.get(level=1)
    vip2 = Vip.objects.get(level=2)
    vip3 = Vip.objects.get(level=3)

    # 获取权限
    vipflag = Permission.objects.get(name='vipflag')
    superlike = Permission.objects.get(name='superlike')
    rewind = Permission.objects.get(name='rewind')
    anylocation = Permission.objects.get(name='anylocation')
    unlimit_like = Permission.objects.get(name='unlimit_like')
    who_liked_me = Permission.objects.get(name='who_liked_me')

    # 给 VIP 1 分配权限
    VipPermRelation.objects.get_or_create(vip_id=vip1.id, perm_id=vipflag.id)
    VipPermRelation.objects.get_or_create(vip_id=vip1.id, perm_id=superlike.id)

    # 给 VIP 2 分配权限
    VipPermRelation.objects.get_or_create(vip_id=vip2.id, perm_id=vipflag.id)
    VipPermRelation.objects.get_or_create(vip_id=vip2.id, perm_id=superlike.id)
    VipPermRelation.objects.get_or_create(vip_id=vip2.id, perm_id=rewind.id)

    # 给 VIP 3 分配权限
    VipPermRelation.objects.get_or_create(vip_id=vip3.id, perm_id=vipflag.id)
    VipPermRelation.objects.get_or_create(vip_id=vip3.id, perm_id=superlike.id)
    VipPermRelation.objects.get_or_create(vip_id=vip3.id, perm_id=rewind.id)
    VipPermRelation.objects.get_or_create(vip_id=vip3.id, perm_id=anylocation.id)
    VipPermRelation.objects.get_or_create(vip_id=vip3.id, perm_id=unlimit_like.id)
    VipPermRelation.objects.get_or_create(vip_id=vip3.id, perm_id=who_liked_me.id)


def insert_avatar(gender):
    users = User.objects.filter(Q(gender=gender) & Q(avatar=''))
    print(users.count())
    avatar_list = run(1, 20)  # 下次从第35页开始
    print(len(avatar_list))
    for idx, user in enumerate(users):
        user.avatar = avatar_list[idx]
        user.save()


if __name__ == '__main__':
    # create_robots(500)

    #男生 male  女生female
    insert_avatar('female')
    # init_permission()
    # init_vip()
    # create_vip_perm_relations()
