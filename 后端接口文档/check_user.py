#查看个人参与项目详情列表
# coding=utf8
import sys

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json

#导入模块

check_user = Blueprint("check_user", __name__)
@check_user.route('/admin/item/check_user',methods=['POST'])#路径
def check_user():
    project_key = str(json.loads(request.values.get("project_key")))
    user_key = str(json.loads(request.values.get("user_key")))#获取参数
    
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
    sql = "select user_perm from people_join where user_ID = %s" % (user_ID)
    cursor.execute(sql)
    up = cursor.fetchall()#获得user权限
    cursor.close()
    conn.close()  # 关闭连接（方便其他接口之后的开启）
    if up >= 1:
        cursor = conn.cursor()
        sql = "select user_name from object where project_key = %s" % (project_key)
        cursor.execute(sql)
        un = cursor.fetchall()#查询用户名
        sql = "select user_ID from object where project_key = %s" % (project_key)
        cursor.execute(sql)
        uID = cursor.fetchall()#查询用户ID
        sql = "select user_perm from object where project_key = %s" % (project_key)
        cursor.execute(sql)
        up = cursor.fetchall()#查询用户权限
        sql = "select user_admin from object where project_key = %s" % (project_key)
        cursor.execute(sql)
        uad = cursor.fetchall()#查询用户是否为管理员
        cursor.close()
        conn.close()  # 关闭连接（方便其他接口之后的开启）
        
        s = 1 
        res = {}
        res['code'] = s
        res['user_name'] = un
        res['user_ID'] = uID#返回user ID
        res['user_perm'] = up
        res['user_admin'] = uad
        return json.dumps(res)#权限足够，可以访问
        
    else:
        s = 0
        M="权限不足"
        res = {}
        res['code'] = s
        res['msg'] = M
        return json.dumps(res)#权限不足，无法访问