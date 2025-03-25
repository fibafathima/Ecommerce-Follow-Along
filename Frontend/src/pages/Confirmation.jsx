import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Confirmation = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const selectedAddress = location.state?.selectedAddress || null;
    const navigate = useNavigate();
    const token = localStorage.getItem("Token");
    const [email, setEmail] = useState("");
    const [selectedMethod, setSelectedMethod] = useState("");

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const res = await axios.get("https://ecommerce-follow-along-pjqp.onrender.com/cart/products", {
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setCartItems(res.data.cart);
            setEmail(localStorage.getItem("email"));
        } catch (error) {
            console.error("Error fetching cart items:", error);
        } finally {
            setLoading(false);
        }
    };

    const totalPrice = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    }, [cartItems]);

    const updateQuantity = async (cartItemId, type) => {
        try {
            await axios.put(
                `https://ecommerce-follow-along-pjqp.onrender.com/cart/${type}/${cartItemId}`, 
                {}, 
                { headers: { authorization: `Bearer ${token}` } }
            );
            fetchCartItems();
        } catch (error) {
            console.error(`Error updating quantity (${type}):`, error);
            alert(`Failed to ${type} quantity. Try again.`);
        }
    };

    const handleSelection = (method) => {
        setSelectedMethod(method);
    };

    const handleOrder = async () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        if (!email) {
            alert("User email is required");
            return;
        }

        if (!selectedAddress) {
            alert("Please select an address.");
            return;
        }

        if (!selectedMethod) {
            alert("Please select a payment method.");
            return;
        }

        const orderData = {
            email,
            products: cartItems.map((item) => ({
                _id: item?.product?._id,
                quantity: item?.quantity,
            })),
            address: {
                addressType: selectedAddress.addressType,
                address1: selectedAddress.address1,
                city: selectedAddress.city,
                country: selectedAddress.country,
                zipCode: selectedAddress.zipCode,
            },
        };

        if (selectedMethod === "cod") {
            try {
                const response = await axios.post(
                    "https://ecommerce-follow-along-pjqp.onrender.com/orders/place",
                    orderData,
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.status === 201 || response.data.success) {
                    alert("Order placed successfully!");
                    navigate("/orders");
                } else {
                    alert("Failed to place order. Please try again.");
                }
            } catch (error) {
                console.error("Error placing order:", error.message);
                alert(`An error occurred while placing the order: ${error.message}`);
            }
        } else {
            navigate("/paypal");
        }
    };

    return (
        <div className="container mx-auto mt-8 p-4">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

            {loading ? (
                <p>Loading cart items...</p>
            ) : cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map((item) => (
                    <div
                        key={item._id}
                        className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4"
                    >
                        <img
                            src={item?.product?.productImage[0]}
                            alt={item?.product?.productName}
                            className="w-24 h-24 object-cover rounded-md"
                        />
                        <div>
                            <h3 className="text-xl font-semibold">{item?.product?.productName}</h3>
                            <p className="text-gray-600">${item?.product?.productPrice}</p>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={() => updateQuantity(item._id, "decrease")}
                                className="bg-gray-300 px-3 py-1 rounded-l-lg"
                            >
                                -
                            </button>
                            <span className="px-4">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item._id, "increase")}
                                className="bg-gray-300 px-3 py-1 rounded-r-lg"
                            >
                                +
                            </button>
                        </div>
                        <p className="text-lg font-bold">${item.totalPrice}</p>
                    </div>
                ))
            )}

            <div className="mx-24 mt-2 p-4">
                <h2 className="text-xl font-bold mt-6">Selected Address:</h2>
                {selectedAddress ? (
                    <p className="text-gray-700">
                        {`${selectedAddress.addressType}, ${selectedAddress.address1}, ${selectedAddress.city}, ${selectedAddress.country}`}
                    </p>
                ) : (
                    <p className="text-gray-500">No address selected.</p>
                )}
            </div>

            <h2 className="text-xl font-bold mx-24 mt-4 p-4">
                Total Price: ${totalPrice.toFixed(2)}
            </h2>

            <div className="mx-24 mt-2 p-2">
                <label className="font-semibold">Select Payment Method:</label>
                <div className="mt-2">
                    <label className="mr-5">
                        <input 
                            type="radio" 
                            id="online"
                            name="payment"
                            checked={selectedMethod === "online"}
                            onChange={() => handleSelection("online")}
                            className="mr-2"
                        />
                        Online
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            id="cod"
                            name="payment"
                            checked={selectedMethod === "cod"}
                            onChange={() => handleSelection("cod")}
                            className="mr-2"
                        />
                        COD
                    </label>
                </div>
            </div>

            <button
                onClick={handleOrder}
                disabled={!selectedMethod}
                className={`absolute bottom-10 right-10 px-4 py-2 rounded-lg shadow-md font-semibold ${
                    selectedMethod
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-400 cursor-not-allowed"
                }`}
            >
                Place Order
            </button>
        </div>
    );
};

export default Confirmation;
