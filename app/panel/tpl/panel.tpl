<div class="invite-panel-wrap">
  <div class="invite-panel-title">
    <input class="text" type="text" name="search"
      value="" placeholder="搜索你想邀请的人">
    <span class="invite-status"></span>
  </div>
  <h3>推荐人选</h3>
  <ul class="invite-suggest-persons">
    {{#recommended}}
    {{#even}}
    <li class="even">
    {{/even}}
    {{^even}}
    <li class="odd">
    {{/even}}
      <a href="" class="invite-uavatar">
        <img src="{{ avatarPath }}">
      </a>
      <div class="invite-uinfo">
        {{#invited}}
        <button class="btn btn-inverse uninvite-btn"
          data-id="{{ id }}">收回邀请</button>
        {{/invited}}
        {{^invited}}
        <button class="btn btn-primary invite-btn"
          data-id="{{ id }}">邀请回答</button>
        {{/invited}}
        <a href="">{{ fullName }}</a>
        <p>{{ bio }}</p>
      </div>
    </li>
    {{/recommended}}
  </ul>
</div>
