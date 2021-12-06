#疑问：如果invitecode出错应该如何处理
# coding=utf8
import sys
import time

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json

#导入模块
Join = Blueprint("join", __name__)
@Join.route('/admin/item/join',methods=['POST'])
def join():
    invitecode = str(json.loads(request.values.get("invitecode")))
    user_ID = str(json.loads(request.values.get("user_ID")))
    conn = pymysql.Connect(
        host='localhost',
        port=3306,
        user='woider',
        passwd='3243',
        db='python',
        charset='utf8'
    )#连接数据库
    # 获取游标
    cursor = conn.cursor()
    #确认邀请码
    sql = "select project_key from project where invitecode='%s'" % (invitecode)
    cursor.execute(sql)
    project_key = cursor.fetchall()
    if len(project_key)>0:
        #获取strpk = project_key
        sql = "select project_key from project where invitecode='%s'" % (invitecode)
        cursor.execute(sql)
        pk = cursor.fetchone()
        strpk = ''.join(pk)
        #获取现有人数
        sql = "select people_num from project where invitecode='%s'" %(invitecode)
        cursor.execute(sql)
        p_num = cursor.fetchone()
        ip_num = int(p_num[0])
        #获取项目最大人数
        sql = "select people_max from project where invitecode='%s'" %(invitecode)
        cursor.execute(sql)
        p_max = cursor.fetchone()
        ip_max = int(p_max[0])
        #如果人数未满
        if ip_num<ip_max:
            #插入数据，权限仅查看，非管理员
            sql = "insert into people_join values('%s', '%s', 1, 0)" %(strpk, user_ID)
            cursor.execute(sql)
            conn.commit()
            sql = "update project set people_num =people_num+1 where invitecode='%s'" %(invitecode)
            cursor.execute(sql)
            conn.commit()
            s = 1
            res = {}
            res['code'] = s
        else:
            s = 0
            res = {}
            res['code'] = s
            msg = "人数已满"
            res['msg'] = msg
    else:
        s = 0
        res = {}
        res['code'] = s
        msg = "邀请码错误"
        res['msg'] = msg
    cursor.close()
    conn.close()#关闭连接（方便其他接口之后的开启）

    return json.dumps(res, ensure_ascii=False)