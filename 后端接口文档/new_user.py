#查看个人参与项目详情列表
# coding=utf8
import sys

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json

#导入模块

new_user = Blueprint("new_user", __name__)
@new_user.route('/admin/item/new_user',methods=['POST'])
def new_user():
    project_key = str(json.loads(request.values.get("project_key")))
    user_perm = int(json.loads(request.values.get("user_perm")))
    user_ID = str(json.loads(request.values.get("user_ID")))
    user_perm = int(json.loads(request.values.get("user_perm")))
    join_user_admin = int(json.loads(request.values.get("join_user_admin")))#获取参数
    
    conn = pymysql.Connect(
        host='localhost',
        port=3306,
        user='woider',
        passwd='3243',
        db='python',
        charset='utf8'
    )#连接数据库
    # 获取游标
    if user_perm >= 2:
        cursor = conn.cursor()
        sql = "insert into object value (%s,%d,%d) where project_key = %s",(user_ID,user_perm,join_user_admin,project_key)
        cursor.execute(sql)
        sql = "select people_num form project where project_key = %s" % (project_key)
        cursor.execute(sql)
        pn = cursor.fatchone()
        pn = pn + 1
        sql = "updata project set people_num = %d where project_key = %s",(pn,project_num) 
        cursor.close()
        conn.close()#关闭连接（方便其他接口之后的开启）
        s = 1
        res = {}
        res['code'] = s
        res['people'] = pn
        res['user_ID'] = user_ID
        res['user_perm'] = user_perm
        res['join_user_admin'] = join_user_admin
        return json.dumps(res)
    else:
        s = 0
        M="权限不足"
        res = {}
        res['code'] = s
        res['msg'] = M
        return json.dumps(res)

    return json.dumps(res.decode('utf8'))