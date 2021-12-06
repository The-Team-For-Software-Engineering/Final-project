#查看个人参与项目详情列表
# coding=utf8
import sys

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json
import time

#导入模块

new_item = Blueprint("new_item", __name__)
@new_item.route('/admin/item/new_item',methods=['POST'])
def new_item():
    project_name = str(json.loads(request.values.get("project_name")))
    people_max = int(json.loads(request.values.get("people_nmax")))
    switchto = int(json.loads(request.values.get("switchto")))
    notes = str(json.loads(request.values.get("notes")))
    invite_limit = str(json.loads(request.values.get("invite_limit")))
    user_ID = str(json.loads(request.values.get("user_ID")))#获取参数
    
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
    sql = "insert into project value(%s,%d,%d,%s,%s,%s,%d )",(people_name,people_max,switchto,notes,user_ID,invitcode,isopen)
    cursor.execute(sql)#向project表添加新的项目
    sql = "select project_key form project where user_ID = %s" % (user_ID)
    cursor.execute(sql)
    pk = cursor.fatchone()#查询项目编号
    time_create = time.ctime()  # ctime()：获取当前的时间并以易读方式表示，返回字符串
    sql = "select user_name form project where user_ID = %s" % (user_ID)
    cursor.execute(sql)
    un = cursor.fatchone()#查询用户ID
    cursor.close()
    conn.close()#关闭连接（方便其他接口之后的开启）
    
    

    s = 1
    res = {}
    res['code'] = s
    res['people_key'] = pk
    res['time_create'] = time_create
    res['user_name'] = un
    return json.dumps(res)
