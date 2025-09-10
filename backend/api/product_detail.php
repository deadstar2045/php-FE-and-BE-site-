<?php


require_once '../index.php';

try {
    $pdo = getDatabaseConnection();
    
    // Extract product ID from URL
    $path_parts = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
    $product_id = end($path_parts);
    
    if (!is_numeric($product_id)) {
        sendJsonResponse(['success' => false, 'error' => 'Invalid product ID'], 400);
    }
    
    $sql = "SELECT * FROM products WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':id' => $product_id]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$product) {
        sendJsonResponse(['success' => false, 'error' => 'Product not found'], 404);
    }
    
    sendJsonResponse(['success' => true, 'data' => $product]);
    
} catch (Exception $e) {
    sendJsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
?>
