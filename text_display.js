/* text_display.js */

document.addEventListener('DOMContentLoaded', () => {
    const textContainer = document.getElementById('text-container');
    const switchInput = document.getElementById('modeSwitch');

    // === テキスト表示の頻度設定 ===
    // テキスト出現の待機時間範囲（ミリ秒）
    const TEXT_DISPLAY_CONFIG = {
        minDelay: 2000,      // 最小待機時間（ミリ秒）
        maxDelay: 3000,     // 最大待機時間（ミリ秒）
        specialDelay: 3500  // 特別なテキスト後の待機時間（ミリ秒）
    };

    // === テキストデータ ===

    // OFFモード
    const textOff = [
        "・・・・",
        "開発ってなんだろう",
        "ものづくりがすき",
        "クリエイター",
        "・・・",
        "技術を学ぶため高専に入った",
        "今はSESで開発",
        "最近想像力が落ちてる気がする",
        "エビデンス作成",
        "仕様変更",
        "AIでよくないか",
        "遊び心",
        "UXデザイン？",
        "締め切りギリギリで作成中",
        "デザインってどうやって学ぶんだろう",
        "本当にユーザーに価値を提供できているのか",
    ];

    // ONモード
    const textOn = [
        "SWITCH！",
        "夕焼け空のグラデーションが好き",
        "フレームワークは使ってないです",
        "処理を軽くしたかった",
        "作ってるとつい機能を追加しちゃう",
        "本来のクリエイトを忘れていた",
        "デザインで付加価値をつけたい",
        "たのしい",
        "ノイズ加工ってなんかかっこいい",
        "このダンスはウッーウッーウマウマ(ﾟ∀ﾟ)",
        "小分けにして開発",
        "調整できるように変数を作ろう",
        "Liquid Glassはカッコいいけどね、",
        "言われたものを作るだけじゃあつまらない",
        "UIに遊び心を入れると利便性が下がるけど、",
        "無駄なことに価値を見出すのがクリエイトなんじゃないか",
        "実はUXってよくわかってない",
        "SVGアニメーションの可能性",
        "クリエイトには意思も必要",
        "いい企画",
        "ものづくりは楽しい",
        "自分で設計したものが動くのは嬉しい",
        "何かを取り戻した気がする",
    ];
    // 特別扱いしたいテキスト
    const SPECIAL_TEXTS = [
        "SWITCH！",
        "無駄なことに価値を見出すのがクリエイトなんじゃないか",
        "クリエイトには意思も必要",
    ];

    // 状態管理
    let indexOff = 0;
    let indexOn = 0;

    // ループ開始
    spawnText();

    function spawnText() {
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

        // 次の出現までの時間をランダム設定
        let nextDelay = Math.random() * (TEXT_DISPLAY_CONFIG.maxDelay - TEXT_DISPLAY_CONFIG.minDelay) + TEXT_DISPLAY_CONFIG.minDelay;

        // ★リストに含まれているかチェック
        if (SPECIAL_TEXTS.includes(text)) {
            nextDelay = TEXT_DISPLAY_CONFIG.specialDelay; // 特別なテキストの後は余韻を持たせる
        }

        setTimeout(spawnText, nextDelay);
    }

    function createTextElement(text) {
        if (!textContainer) return;

        const el = document.createElement('div');
        el.classList.add('floating-text');
        el.textContent = text;

        // === 特別なテキストか判定 ===
        // ★リストに含まれているかチェック
        const isSpecial = SPECIAL_TEXTS.includes(text);

        if (isSpecial) {
            // ★特別設定：画面中央固定
            el.style.left = '50%';
            el.style.top = '50%';
            el.style.fontSize = '2rem';

        } else {
            // ★通常設定：ランダム配置
            const randomX = Math.random() * 80 + 10;
            const randomY = Math.random() * 35 + 10;

            el.style.left = `${randomX}%`;
            el.style.top = `${randomY}%`;
            const size = Math.random() * 0.5 + 1.0;
            el.style.fontSize = `${size}rem`;
        }
        const duration = Math.random() * 3 + 3;

        el.style.animation = `floatTextAnim ${duration}s ease-out forwards`;

        // DOMに追加
        textContainer.appendChild(el);

        // アニメーション終了後に削除
        el.addEventListener('animationend', () => {
            el.remove();
        });
    }
});

