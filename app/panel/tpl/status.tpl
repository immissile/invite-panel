{{#show}}
您已邀请
<a href="/user/{{ user_one.id }}">{{ user_one.fullName }}</a>
{{#user_two}}、{{/user_two}}
<a href="/user/{{ user_two.id }}">{{ user_two.fullName }}</a>
{{#user_two}}
等<i>{{ total }}</i>人
{{/user_two}}
{{/show}}
