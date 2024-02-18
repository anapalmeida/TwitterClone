$("#postTextarea").keyup((event) => {
  var textbox = $(event.target);
  var value = textbox.val().trim();
  var submitButton = $("#submitPostButton");

  if (submitButton.length == 0) return alert("No submit button found.");

  if (value == "") {
    submitButton.prop("disabled", true);
    return;
  } else {
    submitButton.prop("disabled", false);
  }
});

$("#submitPostButton").click((event) => {
  var button = $(event.target);
  var textbox = $("#postTextarea");

  var data = {
    content: textbox.val(),
  };

  $.post("/api/posts", data, (postData) => {
    var html = createPostHtml(postData);
    $(".postsContainer").prepend(html);
    textbox.val("");
    button.prop("disabled", true);
  });
});

function createPostHtml(postData) {
  var postedBy = postData.postedBy;

  function getTimestampDifference(timestamp) {
    var today = new Date();
    var differenceInSeconds = Math.floor((today - timestamp) / 1000);

    if (differenceInSeconds < 60) {
      return differenceInSeconds + "s";
    } else if (differenceInSeconds < 86400) {
      return Math.floor(differenceInSeconds / 3600) + "h";
    } else if (differenceInSeconds / 3600 > 24) {
      return timestamp.getMonth() + " " + timestamp.getDay();
    }
  }

  var timestamp = new Date(postData.createdAt);
  var timeDifference = getTimestampDifference(timestamp);

  return `
    <div class="post">
      <div class='mainContentContainer'>
        <div class='userImageContainer'>
          <a href='/profile/${postedBy.username}'>
            <img src='${postedBy.profilePicture}'>
          </a>
        </div>
        <div class='postContentContainer'>
          <div class='header'>
            <a href='/profile/${postedBy.username}' class='displayName'>${postedBy.firstName} ${postedBy.lastName}</a>
            <span class="username">@${postData.postedBy.username}</span>
            <div class="divider"><span>·</span></div>
            <a class='date' href='/${postedBy.username}/status/${postData._id}'><span>${timeDifference}</span></a>
          </div>
          <div class='postBody'>
            <span>${postData.content}</span>
          </div>
          <div class='footer'>
            <div class="footer__container">
              <button class="footer__button footer__button--comment">
                <i class='far fa-comment'></i>
                <span class="footer__quantity">1</span>
              </button>
              <button class="footer__button footer__button--retweet">
                <i class='fas fa-retweet'></i>
                <span class="footer__quantity">1</span>
              </button>
              <button class="footer__button footer__button--like">
                <i class="far fa-heart footer__like--empty"></i>
                <i class="fa fa-heart footer__like--filled" aria-hidden="true"></i>
                <span class="footer__quantity">1</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
