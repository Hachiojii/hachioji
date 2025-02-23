document.addEventListener("DOMContentLoaded", function () {
  const splide = new Splide(".splide", {
    type: "loop",
    perPage: 3,
    perMove: 1,
    focus: "center",
    gap: "1rem",
    autoplay: true,
    interval: 3000,
    arrows: true,
    pagination: true,
    speed: 400,
    padding: false, // パディング設定無効化
    updateOnMove: true, // スライド移動中に状態更新
    fixedWidth: "300px",
    breakpoints: {
      768: {
        perPage: 2,
        padding: false, // レスポンシブでもパディング無効化
      },
      480: {
        perPage: 1,
        padding: false,
      },
    },
  });

  // 初期位置リセット処理
  splide.on("mounted", function () {
    const list = splide.Components.Elements.list;
    list.style.transform = "translateX(0px)"; // 初期位置リセット
    splide.refresh(); // 再計算処理
  });

  splide.on("mounted move", function () {
    var activeIndex = splide.index;
    var comments = document.querySelectorAll(".comment");

    comments.forEach(function (comment) {
      if (parseInt(comment.getAttribute("data-slide")) === activeIndex) {
        comment.classList.add("active");
      } else {
        comment.classList.remove("active");
      }
    });
  });

  splide.mount();
});

// 初期表示時のコメントを表示
const initialComment = document.querySelector('.comment[data-slide="0"]');
if (initialComment) {
  initialComment.classList.add("active");
}

// エラーハンドリングを追加
window.onerror = function (msg, url, line) {
  console.log(`Error: ${msg}\nURL: ${url}\nLine: ${line}`);
  return false;
};
document.addEventListener("DOMContentLoaded", function () {
  // イベント委譲を使用したモーダル機能
  document.body.addEventListener("click", function (event) {
    if (event.target.matches(".modal-trigger")) {
      const modalId = event.target.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "block";
      }
    } else if (
      event.target.matches(".close-modal") ||
      event.target.classList.contains("modal")
    ) {
      event.target.closest(".modal").style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(
    ".section-title, .about-content, .programming-skills, .splide, .contact-info"
  );

  function checkVisibility() {
    const screenPosition = window.innerHeight / 1.3;

    elements.forEach((element) => {
      const position = element.getBoundingClientRect().top;
      if (position < screenPosition) {
        element.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", checkVisibility);
  checkVisibility(); // 初期チェック
});
