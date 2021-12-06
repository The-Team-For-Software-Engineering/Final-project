# coding=utf8
import sys
import time
from types import FrameType

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json, Blueprint
import pymysql.cursors
import json

# 导入模块
Login = Blueprint("login", __name__)


@Login.route('/user/login', methods=['POST'])
def login():
    user_id = str(json.loads(request.values.get("user_id")))
    password = str(json.loads(request.values.get("password")))
    conn = pymysql.Connect(
        host='localhost',
        port=3306,
        user='woider',
        passwd='3243',
        db='db1',
        charset='utf8'
    )  # 连接数据库
    # 检查两次密码是否相同
    cursor = conn.cursor()

    sql = "select password from users where user_ID=%s" % (user_id)
    cursor.execute(sql)
    pw = cursor.fetchone()

    if password != pw:
        s = 0
        res = {}
        res['code'] = s
        msg = "密码错误或账号不存在"
        res['msg'] = msg
    else:
        s = 1
        res = {}
        res['code'] = s

    cursor.close()
    conn.close()  # 关闭连接（方便其他接口之后的开启）

    return (res)