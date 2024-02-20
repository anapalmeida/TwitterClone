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

$(document).on("click", ".footer__button--like", (event) => {
  var button = $(event.target);
  var postId = getPostIdFromElement(button);

  if (postId === undefined) return;

  $.ajax({
    url: `/api/posts/${postId}/like`,
    data: ``,
    type: "PUT",
    success: (postData) => {
      console.log(postData);
    },
  });
});

function getPostIdFromElement(element) {
  var isRoot = element.hasClass("post");
  var rootElement = isRoot ? element : element.closest(".post");
  var postId = rootElement.data().id;

  if (postId === undefined) return console.log("Post id undefined");

  return postId;
}

function createPostHtml(postData) {
  var timestamp = new Date(postData.createdAt);
  var username = postData.postedBy.username;
  var name = postData.postedBy.firstName + " " + postData.postedBy.lastName;

  if (!postData.postedBy) {
    return console.error("User object not populated");
  }

  function getTimestampDifference(timestamp) {
    var today = new Date();
    var differenceInSeconds = Math.floor((today - timestamp) / 1000);

    if (timestamp.getFullYear() !== today.getFullYear()) {
      const options = { month: "short", day: "numeric", year: "numeric" };
      return timestamp.toLocaleDateString(
        navigator.language ? navigator.language : "en-US",
        options
      );
    } else {
      if (differenceInSeconds < 5) {
        return "Just now";
      } else if (differenceInSeconds < 60) {
        return differenceInSeconds + "s";
      } else if (differenceInSeconds < 3600) {
        return Math.floor(differenceInSeconds / 60) + "m";
      } else if (differenceInSeconds < 86400) {
        return Math.floor(differenceInSeconds / 3600) + "h";
      } else if (differenceInSeconds / 3600 > 24) {
        const options = { month: "short", day: "numeric" };
        return timestamp.toLocaleDateString(
          navigator.language ? navigator.language : "en-US",
          options
        );
      }
    }
  }

  var date = getTimestampDifference(timestamp);

  return `
    <div class="post" data-id='${postData._id}'>
      <div class='mainContentContainer'>
        <div class='userImageContainer'>
          <a href='/profile/${username}'>
            <img src='${postData.postedBy.profilePicture}'>
          </a>
        </div>
        <div class='postContentContainer'>
          <div class='header'>
            <a href='/profile/${username}' class='displayName'>${name}</a>
            <span class="username">@${username}</span>
            <div class="divider"><span>·</span></div>
            <a class='date' href='/${username}/status/${postData._id}'><span>${date}</span></a>
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
