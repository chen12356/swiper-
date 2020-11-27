'''
程序逻辑配置和第三方平台配置
'''

# Redis 配置
REDIS = {
    'host': 'localhost',
    'port': 6379,
    'db': 5,
}


HOT_RANK_SCORE = {
    'like': 5,
    'superlike': 7,
    'dislike': -5,
}


# 反悔的配置
REWIND_TIMES =5  # 每天反悔次数
REWIND_TIMEOUT = 60 * 5  # 反悔的超时时间


# 云之讯短信平台配置
YZX_SMS_API = 'https://open.ucpaas.com/ol/sms/sendsms'
YZX_SMS_ARGS = {
    # "sid": "2ff56f07e2d002ab9900777dd4b09edf",
    "sid": "5f6da1d7de0ef66861baba1acb2f16e5",
    # "token": "d763718424035afc347cbd3bba3813a2",
    "token": "880cf44120477c017719879e5923b9d5",
    # "appid": "8235102f41ed4603802b05264c59430e",
    "appid": "d4bc9ff2c1c0402084ea9854503d2fa6",
    # "templateid": "503617",
    "templateid": "518690",
    "param": None,
    "mobile": None,
}


QN_AK = 'NgSX0tJ0uzqKlL_zMkLeqbnFX7MWTn7lLjvzvYLe'
QN_SK = 'FV4S3xBqeJnT_h5NHx-RhEOfy5qVpH0dY32EtTqu'
QN_BUCKET_NAME = 'cqq1'
QN_BASE_URL = 'http://qa7olugru.bkt.clouddn.com'
