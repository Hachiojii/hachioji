document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");

  header.addEventListener("click", function (e) {
    if (e.target.closest("a, button")) return; // リンクやボタンのクリックは無視

    createShootingStar();
  });

  function createShootingStar() {
    const star = document.createElement("div");
    star.classList.add("shooting-star");

    // ヘッダーの範囲内に収まるように位置を設定
    const startX = Math.random() * header.clientWidth;
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

    // ランダムな速度を設定（0.5秒から2秒の間）
    const duration = Math.random() * 1500 + 500;

    // 停止位置を事前に計算（ヘッダーの下から5%の位置）
    const stopY = header.clientHeight * 0.6;
    const stopX = Math.tan((angle * Math.PI) / 180) * stopY;

    // アニメーションの開始時間を記録
    const startTime = performance.now();

    // アニメーション関数
    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      if (elapsed < duration) {
        const progress = elapsed / duration;
        const translateY = progress * stopY;
        const translateX = progress * stopX;
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
