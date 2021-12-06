# coding=utf8
import sys

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json

#导入模块

Login = Blueprint("login", __name__)
@Login.route('/user/login',methods=['POST'])
def login():
    user_id = str(json.loads(request.values.get("user_id")))
    conn = pymysql.Connect(
        host='localhost',
        port=3306,
        user='woider',
        passwd='3243',
        db='python',
        charset='utf8'
    )#连接数据库
    # 获取游标
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)#以键值对的形式获取数据
    sql = "select * from users where user_id=%s" % (user_id)
    cursor.execute(sql)
    res = cursor.fetchall()
    cursor.close()
    conn.close()#关闭连接（方便其他接口之后的开启）


    return json.dumps(res.decode('utf8'))