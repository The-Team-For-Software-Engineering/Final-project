#查看个人参与项目详情列表
# coding=utf8
import sys

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json

#导入模块

check_item = Blueprint("check_item", __name__)
@check_item.route('/user/check_item',methods=['POST'])
def check_item():
    user_ID = str(json.loads(request.values.get("user_ID")))#获取参数
    user_key = str(json.loads(request.values.get("user_key")))
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
    cursor.execute("select project_key from project")
    
    cursor.execute("select project_key form project where user_ID = %s" % (user_ID))
    project_key = cursor.fetchall()#查询项目标识符
    cursor.execute("select project_name form project where user_ID = %s" % (user_ID))
    project_name = cursor.fetchall()#查询项目名
    cursor.execute("select people_num form project where user_ID = %s" % (user_ID))
    people_num = cursor.fetchall()#查询当前人数
    cursor.execute("select people_max form project where user_ID = %s" % (user_ID))
    people_max = cursor.fetchall()#查询最大人数
    cursor.execute("select time_create form project where user_ID = %s" % (user_ID))
    time_create = cursor.fetchall()#查询项目创建时间
    cursor.execute("select time_updata form project where user_ID = %s" % (user_ID))
    time_updata = cursor.fetchall()#查询项目最后一次修改时间
    cursor.execute("select notes form project where user_ID = %s" % (user_ID))
    notes = cursor.fetchall()#查询备注
    cursor.execute("select switchto form project where user_ID = %s" % (user_ID))
    switchto = cursor.fetchall()#查询是否面对所有人
    cursor.execute("select isopen form project where user_ID = %s" % (user_ID))
    isopen = cursor.fetchall()#查询是否开启权限
    cursor.execute("select invitecode form project where user_ID = %s" % (user_ID))
    invitecode = cursor.fetchall()#查询邀请码
    cursor.close()
    conn.close()#关闭连接（方便其他接口之后的开启）

    s = 1
    res = {}
    res['code'] = s
    res['project_key'] = project_key
    res['project_name'] = project_name
    res['people_num'] = people_num
    res['people_max'] = people_max
    res['time_create'] = time_create
    res['time_updata'] = time_updata
    res['notes'] = notes
    res['switchto'] = switchto
    res['isopen'] = isopen
    res['invitecode'] = invitecode
    return json.dumps(res)# 权限足够，可以访问
