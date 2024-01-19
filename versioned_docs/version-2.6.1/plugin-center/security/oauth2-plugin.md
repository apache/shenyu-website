---
title: OAuth2 Plugin
keywords: ["OAuth2"]
description: OAuth2 plugin
---

## Description

The `OAuth2` plugin in Apache Shenyu is implemented using the OAuth2 standard. It allows for secure and authorized access to protected resources on a web server by using a token-based authentication method.

## How Does It Works?

In Apache Shenyu, the OAuth2 plugin acts as the client application, while the authorization server and resource server are typically provided by external services like GitHub, Google, or Facebook. When a user attempts to access a protected resource on the Apache Shenyu server, the OAuth2 plugin redirects the user to the authorization server to request permission to access the resource. The user then logs in to the authorization server and grants permission for the client application (OAuth2 plugin) to access the requested resource on their behalf. The authorization server then sends a token to the client application, which it can use to access the resource server and retrieve the protected resource.

## Plugin Setting

Setting up the OAuth2 Plugin in Apache Shenyu

To configure the OAuth2 plugin in Apache Shenyu, you will need to follow these steps:

* Step 1: Install the OAuth2 Plugin

  First, you need to ensure that the OAuth2 plugin is installed and enabled in Apache Shenyu. If it is not already installed, you can download it from the Shenyu GitHub repository and follow the installation instructions.

* Step 2: Register an OAuth2 Application with the Authorization Server

  Before you can use the OAuth2 plugin in Apache Shenyu, you need to register an OAuth2 application with the authorization server you plan to use (e.g., GitHub, Google, etc.). The registration process typically involves providing basic information about your application, such as the application name, website URL, and redirect URI.

  Once you have registered your OAuth2 application with the authorization server, you will receive a client ID and client secret, which you will need to use in the next step.
  
* Step 3: Configure the OAuth2 Plugin

  To configure the OAuth2 plugin in Apache Shenyu, you will need to modify the shenyu-server.yaml configuration file. Here's an example of what the configuration might look like:

  ```
  plugins:
  oauth2:
    enabled: true
    client_id: <your_client_id>
    client_secret: <your_client_secret>
    authorization_url: <authorization_server_url>
    token_url: <token_endpoint_url>
    user_info_url: <user_info_endpoint_url>
  ```

    * `enabled`: Set this to `true` to enable the OAuth2 plugin in Shenyu.
    * `client_id` and `client_secret`: These are the client credentials you received when you registered your OAuth2 application with the authorization server.
    * `authorization_url`: This is the URL of the authorization server's authorization endpoint.
    * `token_url`: This is the URL of the authorization server's token endpoint.
    * `user_info_url`: This is the URL of the authorization server's user info endpoint, which is used to retrieve information about the authenticated user.
 
* Step 4: Test the OAuth2 Plugin

  To test the OAuth2 plugin in Apache Shenyu, you can try to access a protected resource on the Shenyu server that requires authentication. When you attempt to access the resource, the OAuth2 plugin should redirect you to the authorization server's login page. After you log in and grant permission to the client application (OAuth2 plugin), the plugin should be able to retrieve an access token and use it to access the protected resource on your behalf.
