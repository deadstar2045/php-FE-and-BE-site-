<?php


require_once '../../index.php';

try {
    $pdo = getDatabaseConnection();
    
    // For demo purposes, we'll use a session-based cart
    // In production, you'd want to associate carts with users
    session_start();
    
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = [];
    }
    
    $cart_items = [];
    
    if (!empty($_SESSION['cart'])) {
        $product_ids = array_keys($_SESSION['cart']);
        $placeholders = str_repeat('?,', count($product_ids) - 1) . '?';
        
        $sql = "SELECT * FROM products WHERE id IN ($placeholders)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($product_ids);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        foreach ($products as $product) {
            $quantity = $_SESSION['cart'][$product['id']];
            $cart_items[] = [
                'product' => $product,
                'quantity' => $quantity,
                'subtotal' => $product['price'] * $quantity
            ];
        }
    }
    
    $total = array_sum(array_column($cart_items, 'subtotal'));
    
    $response = [
        'success' => true,
        'data' => [
            'items' => $cart_items,
            'total' => $total,
            'item_count' => count($cart_items)
        ]
    ];
    
    sendJsonResponse($response);
    
} catch (Exception $e) {
    sendJsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
?>
