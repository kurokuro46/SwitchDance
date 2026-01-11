/* text_display.js */

document.addEventListener('DOMContentLoaded', () => {
    const textContainer = document.getElementById('text-container');
    const switchInput = document.getElementById('modeSwitch');

    // === テキストデータ ===

    // OFFモード
    const textOff = [
        "はぁ",
        "・・・・",
        "開発ってなんだろう",
        "ものづくりがすき",
        "クリエイターに憧れた",
        "・・・",
        "技術を学ぶため高専に入った",
        "今はSEで開発",
        "最近想像力が落ちてる気がする",
        "エビデンス作成",
        "仕様変更",
        "AIでよくないか",
        "遊び心",
        "UXデザイン？",
        "締め切りギリギリで作成中",
    ];

    // ONモード
    const textOn = [
        "SWITCH！",
        "フレームワークは使ってないです",
        "処理を軽くしたかった",
        "作ってるとつい機能を追加しちゃう",
        "意味はない",
        "夕焼け空のグラデーションが好き",
        "ノイズ加工ってなんかかっこいい",
        "このダンスはウッーウッーウマウマ(ﾟ∀ﾟ)",
        "AI Agentにダンスを教えるのが一番苦労",
        "一発ではできなかったので、小分けにして開発",
        "調整できるように変数を作らせるのもよし",
        "Liquid Glassはあんまり好きじゃない",
        "UIに遊び心を入れると利便性が下がる",
        "無駄なことに価値を見出すのがクリエイトなんじゃないか",
        "実はUXはよくわかってない",
        "SVGアニメーションの可能性",
        "クリエイトには意思も必要",
        "いい企画ですわ",
        "ものづくりは楽しい"
    ];

    // 状態管理
    let indexOff = 0;
    let indexOn = 0;

    // ループ開始
    spawnText();

    function spawnText() {
        // 現在のモード判定（スイッチの状態を直接見る）
        const isDanceMode = switchInput.checked;
        let text = "";

        if (isDanceMode) {
            text = textOn[indexOn];
            indexOn = (indexOn + 1) % textOn.length;
        } else {
            text = textOff[indexOff];
            indexOff = (indexOff + 1) % textOff.length;
        }

        createTextElement(text);

        // 次の出現までの時間をランダム設定 (800ms ~ 2500ms)
        const nextDelay = Math.random() * 1700 + 800;
        setTimeout(spawnText, nextDelay);
    }

    function createTextElement(text) {
        if (!textContainer) return;

        const el = document.createElement('div');
        el.classList.add('floating-text');
        el.textContent = text;

        // === ランダム配置ロジック ===

        // X軸: 画面幅の10%〜90%の間に配置
        const randomX = Math.random() * 80 + 10;

        // Y軸: 画面上部 10%〜45% のあたり
        const randomY = Math.random() * 35 + 10;

        // アニメーション時間: 3秒〜6秒
        const duration = Math.random() * 3 + 3;

        // フォントサイズ: 1rem ~ 1.5rem
        const size = Math.random() * 0.5 + 1.0;

        // スタイル適用
        el.style.left = `${randomX}%`;
        el.style.top = `${randomY}%`;
        el.style.fontSize = `${size}rem`;
        el.style.animation = `floatTextAnim ${duration}s ease-out forwards`;

        // DOMに追加
        textContainer.appendChild(el);

        // アニメーション終了後に削除
        el.addEventListener('animationend', () => {
            el.remove();
        });
    }
});