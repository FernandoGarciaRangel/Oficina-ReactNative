const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputFile = path.join(__dirname, 'icon.svg');
const outputDir = __dirname;

async function generateIcons() {
    try {
        // Ler o arquivo SVG
        const svgBuffer = fs.readFileSync(inputFile);

        // Gerar ícones para cada tamanho
        for (const size of sizes) {
            const outputFile = path.join(outputDir, `icon-${size}x${size}.png`);
            
            await sharp(svgBuffer)
                .resize(size, size)
                .png()
                .toFile(outputFile);
            
            console.log(`Ícone ${size}x${size} gerado com sucesso!`);
        }
    } catch (error) {
        console.error('Erro ao gerar ícones:', error);
    }
}

generateIcons(); 