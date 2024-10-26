const cart = [];
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const itemName = button.parentElement.getAttribute("data-name");
        const itemPrice = Number(button.parentElement.getAttribute("data-price"));

        const item = cart.find(i => i.name === itemName);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ name: itemName, price: itemPrice, quantity: 1 });
        }

        updateCart();
    });
});

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} x ${item.quantity} = ${item.price * item.quantity} บาท`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPrice.textContent = total;
}

document.getElementById("confirm-order").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("ไม่มีสินค้าในตะกร้า");
        return;
    }

    fetch("http://localhost:3001/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart)
    })
    .then(response => response.json())
    .then(data => {
        alert("สั่งซื้อสำเร็จ! รหัสคำสั่งซื้อ: " + data.orderId);
        cart.length = 0; // ล้างตะกร้าหลังสั่งซื้อเสร็จ
        updateCart();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("เกิดข้อผิดพลาดในการสั่งซื้อ");
    });
});
