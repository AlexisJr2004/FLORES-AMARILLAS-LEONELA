function createFlower() {
    const flowerContainer = document.querySelector(".flower-container");
    const maxFlowersOnScreen = 15;
    const maxFlowers = Math.ceil(Math.random() * 3 + 1);
    const flowerSize = 100;
    const existingPositions = [];

    if (document.querySelectorAll(".flower").length >= maxFlowersOnScreen) {
        return;
    }

    for (let j = 0; j < maxFlowers; j++) {
        let positionValid = false;
        let randomX, randomY;

        while (!positionValid) {
            randomX = Math.random() * (window.innerWidth - flowerSize);
            randomY = Math.random() * (window.innerHeight - flowerSize);

            positionValid = true;

            for (const position of existingPositions) {
                const distance = Math.sqrt(Math.pow(position.x - randomX, 2) + Math.pow(position.y - randomY, 2));
                if (distance < flowerSize * 1.5) {
                    positionValid = false;
                    break;
                }
            }
        }

        existingPositions.push({ x: randomX, y: randomY });

        const flower = document.createElement("div");
        flower.classList.add("flower", "fade-in");

        for (let i = 1; i <= 10; i++) {
            const petal = document.createElement("div");
            petal.classList.add("petal", `p${i}`);
            flower.appendChild(petal);
        }

        flower.style.left = `${randomX}px`;
        flower.style.top = `${randomY}px`;

        flowerContainer.appendChild(flower);

        const disappearanceTime = Math.random() * 3000 + 2000;

        setTimeout(() => {
            flower.classList.remove("fade-in");
            flower.classList.add("fade-out");
            setTimeout(() => {
                flowerContainer.removeChild(flower);
                existingPositions.splice(existingPositions.findIndex(pos => pos.x === randomX && pos.y === randomY), 1);
            }, 500);
        }, disappearanceTime);
    }
}

setInterval(createFlower, 3000);