import React, { useState } from "react";
import "./Order.css";
import { useNavigate } from "react-router-dom";
import pizzaImage from "../assets/img/size.jpeg";

function Order() {
    const [size, setSize] = useState("");
    const [extras, setExtras] = useState([]);
    const [crust, setCrust] = useState("");
    const [note, setNote] = useState("");
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    // Sabit fiyat
    const basePrice = 85.50;
    const typePrices = { "Küçük": 0, "Orta": 25, "Büyük": 35 };
    const crustPrices = { "İnce": 5, "Cheddar Dolgulu": 15, "Normal": 0 };
    const extraPrice = 5;

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/success");
    };

    const handleExtraChange = (e) => {
        const value = e.target.value;
        setExtras((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const handleQuantityChange = (type) => {
        setQuantity((prev) => (type === "increase" ? prev + 1 : prev > 1 ? prev - 1 : 1));
    };

    // Toplam fiyat hesaplama
    const totalPrice =
        basePrice +
        (typePrices[size] || 0) +
        (crustPrices[crust] || 0) +
        extras.length * extraPrice * quantity;

    return (
        <div className="order">
            <h2>Position Absolute Acı Pizza</h2>
            <h3>
                Frontend Dev olarak hala position:absolute kullanıyorsan, bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
            </h3>
            <p>{totalPrice.toFixed(2)}₺</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <h4>Boyut Seç *</h4>
                    {Object.keys(typePrices).map((sizeOption) => (
                        <label key={sizeOption}>
                            <input
                                type="radio"
                                name="size"
                                value={sizeOption}
                                onChange={() => setSize(sizeOption)}
                                required
                            />
                            {sizeOption}
                            <img src={pizzaImage} alt="Pizza" className="size-image" />
                        </label>
                    ))}
                </div>

                <div>
                    <h3>Hamur Seç *</h3>
                    <select onChange={(e) => setCrust(e.target.value)} required>
                        <option value="">Seçiniz</option>
                        {Object.keys(crustPrices).map((crustOption) => (
                            <option key={crustOption} value={crustOption}>
                                {crustOption} (+{crustPrices[crustOption]}₺)
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <h3>Ek Malzemeler</h3>
                    <p>En fazla 10 malzeme seçebilirsiniz. Her biri 5₺</p>
                    {["Pepperoni", "Sosis", "Kanada Jambonu", "Tavuk Izgara", "Soğan", "Domates", "Mısır", "Sucuk", "Sarımsak", "Biber", "Ananas", "Kabak"].map((extra) => (
                        <label key={extra}>
                            <input
                                type="checkbox"
                                value={extra}
                                onChange={handleExtraChange}
                            />
                            {extra}
                        </label>
                    ))}
                </div>

                <div>
                    <h3>Sipariş Notu</h3>
                    <textarea
                        placeholder="Siparişe eklemek istediğiniz bir not var mı?"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    ></textarea>
                </div>

                <div className="order-summary">
                    <button type="button" onClick={() => handleQuantityChange("decrease")}>
                        -
                    </button>
                    <span>{quantity}</span>
                    <button type="button" onClick={() => handleQuantityChange("increase")}>
                        +
                    </button>
                    <span className="total">{totalPrice.toFixed(2)}₺</span>
                </div>

                <div className="order-summary-details">
                    <h3>Sipariş Toplamı</h3>

                    {extras.length > 0 ? extras.join(", ") : ""}

                    <p><strong>Hamur:</strong> {crust || "Seçmediniz"}</p>
                    <p><strong>Ekstra Malzemeler:</strong> {extras.length > 0 ? extras.join(", ") : "Seçmediniz"}</p>

                    <p><strong>Toplam Fiyat:</strong>
                        {totalPrice.toFixed(2)} ₺
                    </p>
                </div>
                <button type="submit" className="button">
                    Siparişi Ver
                </button>
            </form>
        </div>
    );
}

export default Order;