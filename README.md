# euparei.com

https://euparei.github.io/


Apache confuguration (Mac OS High Sierra):

Alias /euparei "~/Documents/GitHub/euparei.github.io/"
<Directory "~/Documents/GitHub/euparei.github.io/">
    Options FollowSymLinks Multiviews Indexes
    MultiviewsMatch Any
    AllowOverride All
    Require all granted
</Directory>

chmod -R 755 ~/Documents/GitHub/