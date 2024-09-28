document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");

  header.addEventListener("click", function (e) {
    if (e.target.closest("a, button")) return; // リンクやボタンのクリックは無視

    createShootingStar();
  });

  function createShootingStar() {
    const star = document.createElement("div");
    star.classList.add("shooting-star");

    // ランダムな開始位置（header領域の上部20%の範囲内）
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * header.clientHeight * 0.2;
    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;

    // ランダムな長さと速度を設定
    const length = Math.random() * 50 + 50; // 50px から 100px の間
    star.style.height = `${length}px`;

    // ランダムな角度（-30度から30度）
    const angle = Math.random() * 60 - 30;

    // 流れ星の向きを角度に合わせて調整（角度の逆を取る）
    star.style.transform = `rotate(${-angle}deg)`;
    star.style.transformOrigin = "center bottom";

    header.appendChild(star);

    // アニメーションの開始時間を記録
    const startTime = performance.now();
    const duration = Math.random() * 1000 + 1000; // 1秒 から 2秒 の間

    // アニメーション関数
    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      if (elapsed < duration) {
        const progress = elapsed / duration;
        const translateY = progress * window.innerHeight;
        const translateX = Math.tan((angle * Math.PI) / 180) * translateY;
        star.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${-angle}deg)`;
        requestAnimationFrame(animate);
      } else {
        star.remove();
      }
    }

    requestAnimationFrame(animate);
  }

  // セクションにfade-inクラスを追加
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.classList.add("fade-in");
  });

  function checkScroll() {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        section.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll(); // 初期チェック
});
