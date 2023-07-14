// สร้างตัวแปรสำหรับเก็บผลลัพธ์ของการสแกนบาร์โค้ด
let scanner = null;

// สร้างตัวแปรสำหรับการแสดงผล
const resultDiv = document.getElementById('result');

// สร้างฟังก์ชันเริ่มต้นการสแกน
function startScanner() {
  const video = document.getElementById('video');
  scanner = Quagga.init(
    {
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: video,
        constraints: {
          facingMode: 'environment',
        },
      },
      decoder: {
        readers: ['ean_reader'], // อ่านบาร์โค้ดประเภท EAN
      },
    },
    function (err) {
      if (err) {
        console.error(err);
        return;
      }
      scanner.start();
    }
  );

  // เมื่อพบบาร์โค้ด
  scanner.onDetected(function (result) {
    const productData = getProductData(result.codeResult.code);
    displayProductData(productData);
  });
}

// ฟังก์ชันเรียกข้อมูลสินค้าจาก JSON
function getProductData(productCode) {
  // สมมติว่าคุณมี JSON ดังต่อไปนี้
  const products = {
    '123456789': {
      name: 'Product A',
      image: 'productA.jpg',
      price: 10.99,
    },
    '987654321': {
      name: 'Product B',
      image: 'productB.jpg',
      price: 19.99,
    },
    // เพิ่มสินค้าเพิ่มเติมตามต้องการ
  };

  // ค้นหาสินค้าจากรหัสสินค้า
  return products[productCode];
}

// ฟังก์ชันแสดงข้อมูลสินค้า
function displayProductData(productData) {
  if (productData) {
    resultDiv.innerHTML = `
      <h3>${productData.name}</h3>
      <img src="${productData.image}" alt="${productData.name}">
      <p>Price: ${productData.price} USD</p>
    `;
  }
}

// เริ่มต้นการสแกนเมื่อโหลดหน้าเว็บ
window.addEventListener('DOMContentLoaded', startScanner);
