# coding=utf8
import sys
import time

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json

#导入模块
New_acc = Blueprint("new_acc", __name__)
@New_acc.route('/admin/user/new_acc',methods=['POST'])
def new_acc():
    user_ID = str(json.loads(request.values.get("user_ID")))
    password = str(json.loads(request.values.get("password")))
    password_again = str(json.loads(request.values.get("password_again")))
    face_url  = str(json.loads(request.values.get("face_url")))
    conn = pymysql.Connect(
        host='localhost',
        port=3306,
        user='woider',
        passwd='3243',
        db='python',
        charset='utf8'
    )#连接数据库
    #检查两次密码是否相同
    if password != password_again:
        s = 0
        res = {}
        res['code'] = s
        msg = "两次密码不一致"
        res['msg'] = msg
    else:
        #获取游标
        cursor = conn.cursor()
        #检查用户ID是否重复
        sql = "select user_ID from users where user_ID='%s'" %(user_ID)
        cursor.execute(sql)
        test = cursor.fetchall()
        if len(test) > 0:
            s = 0
            res = {}
            res['code'] = s
            msg = "用户名已存在，请重新取名"
            res['msg'] = msg
        else:
            sql = "insert into users values ('%s','%s', '%s')" % (user_ID, face_url, password)
            cursor.execute(sql)
            conn.commit()
            s = 1
            res = {}
            res['code'] = s
        cursor.close()
        conn.close()#关闭连接（方便其他接口之后的开启）

    return json.dumps(res, ensure_ascii=False)