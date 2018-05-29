package com.yuyuyzl.WalletApp.Servlet;

import com.yuyuyzl.WalletApp.Login.LoginHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
public class User extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {


        response.setContentType("text/html");
        response.setCharacterEncoding("utf-8");
        PrintWriter out = response.getWriter();


        if(request.getParameter("Action")!=null) {
            int action = Integer.valueOf(request.getParameter("Action"));
            switch (action) {
                case 1: //Login
                    String username = request.getParameter("Username");
                    String password = request.getParameter("Password");
                    if (true) {      //Todo 校验密码是否正确并获取UID
                        LoginHandler.login(request.getSession().getId(), 0);
                    }
                    break;

                case 2: //logout
                    LoginHandler.logout(request.getSession().getId());
                    break;
            }
        }
        out.println(LoginHandler.getUID(request.getSession().getId()));
    }
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request,response);
    }
}
