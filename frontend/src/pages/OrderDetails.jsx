const [cancelling, setCancelling] = useState(false);

const handleCancelOrder = async () => {

    const confirmed = window.confirm(
        "Are you sure you want to cancel this order?"
    );

    if (!confirmed) {
        return;
    }

    setCancelling(true);

    try {

        const response = await api.put(
            `/orders/${order._id}/cancel`
        );

        setOrder(response.data.order);

        alert(response.data.message);

    } catch (error) {

        alert(
            error.response?.data?.message ||
            "Failed to cancel order"
        );

    } finally {

        setCancelling(false);

    }
};