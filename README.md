Users Management

This application is use to manage the users details. Also including the registration and login and updating the account of the user.

Installation guide.

For Database Installation
1. please kindly download here the xampp for mysql. https://www.apachefriends.org/download.html

2. after you download and install xampp, kindly start the xampp control panel and click start for both APACHE and MYSQL

3. open your browser and go to this link http://localhost/phpmyadmin.

4. Click NEW then put in DATABASE NAME 'users'.

5. After the database created, click SQL then copy and paste there the content of users.sql file.

For NodeJS Installation,

1. open your command prompt and then run 'node -v' to check the version of the nodejs. it should be version 20.10

2. if that is not working, please download the nodejs from this link, https://nodejs.org/en and select '20.10 LTS' and install to your computer and after the installation check it again to your command prompt and run the command again, 'node -v', it should be working

3. checkout the project files from the git repo, and then open your command prompt and go to the project path.

4. run the command, 'npm install' to install the node_modules 
5. after that, run 'npm install express mysql cors body-parser sha1'
6. open another cmd prompt and then go to project path and run 'node server.js' to run expressJS and open another cmd prompt go to project path and run 'ng build' and 'ng serve' to run the angular

7. Enjoy :)

admin credentials to check:
email: admin@gmail.com
password: password