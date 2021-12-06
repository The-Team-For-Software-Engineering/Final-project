# coding=utf8
import sys
import time
from types import FrameType

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json

#导入模块
Login = Blueprint("login", __name__)
@Login.route('/admin/user/login',methods=['POST'])
def login():
    user_ID = str(json.loads(request.values.get("user_ID")))
    password = str(json.loads(request.values.get("password")))
    conn = pymysql.Connect(
        host='localhost',
        port=3306,
        user='woider',
        passwd='3243',
        db='python',
        charset='utf8'
    )#连接数据库
    #检查两次密码是否相同
    cursor = conn.cursor()

    sql = "select password from users where user_ID='%s' and password='%s'" % (user_ID,password)
    cursor.execute(sql)
    test = cursor.fetchall()

    if len(test) > 0:
        s = 1
        res = {}
        res['code'] = s        
    else:
        s = 0
        res = {}
        res['code'] = s
        msg = "密码错误或账号不存在"
        res['msg'] = msg

        
    cursor.close()
    conn.close()#关闭连接（方便其他接口之后的开启）

    return json.dumps(res, ensure_ascii=False)