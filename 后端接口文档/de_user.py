#查看个人参与项目详情列表
# coding=utf8
import sys

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json

#导入模块

de_user = Blueprint("de_user", __name__)
@de_user.route('/admin/item/de_user',methods=['POST'])
def check_item():
    project_key = str(json.loads(request.values.get("project_key")))
    user_perm = int(json.loads(request.values.get("user_perm")))
    user_ID = str(json.loads(request.values.get("user_ID")))
    #获取参数
    
    conn = pymysql.Connect(
        host='localhost',
        port=3306,
        user='woider',
        passwd='3243',
        db='python',
        charset='utf8'
    )#连接数据库
    # 获取游标
    if user_perm == 7:
        cursor = conn.cursor()
        sql = "delete form people_join where project_key = %s and user_ID = %s" %(project_key,user_ID)
        cursor.execute(sql)
        cursor.close()
        conn.close()#关闭连接（方便其他接口之后的开启）
        s = 1
        M = "删除成功"
        res = {}
        res['code'] = s
        res['msg'] = M
        return json.dumps(res)
    else:
        s = 0
        M="权限不足"
        res = {}
        res['code'] = s
        res['msg'] = M
        return json.dumps(res)

    return json.dumps(res.decode('utf8'))