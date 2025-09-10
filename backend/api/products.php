<?php


// Include the main index.php for database connection and helper functions
require_once '../index.php';

try {
    $pdo = getDatabaseConnection();
    
    // Get query parameters
    $category = $_GET['category'] ?? 'all';
    $search = $_GET['search'] ?? '';
    $limit = $_GET['limit'] ?? 20;
    $offset = $_GET['offset'] ?? 0;
    
    // Build the query
    $sql = "SELECT * FROM products WHERE 1=1";
    $params = [];
    
    if ($category !== 'all') {
        $sql .= " AND category = :category";
        $params[':category'] = $category;
    }
    
    if (!empty($search)) {
        $sql .= " AND (name LIKE :search OR description LIKE :search)";
        $params[':search'] = "%$search%";
    }
    
    $sql .= " ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
    $params[':limit'] = (int)$limit;
    $params[':offset'] = (int)$offset;
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Get total count for pagination
    $countSql = "SELECT COUNT(*) FROM products WHERE 1=1";
    if ($category !== 'all') {
        $countSql .= " AND category = :category";
    }
    if (!empty($search)) {
        $countSql .= " AND (name LIKE :search OR description LIKE :search)";
    }
    
    $countStmt = $pdo->prepare($countSql);
    $countStmt->execute($params);
    $total = $countStmt->fetchColumn();
    
    $response = [
        'success' => true,
        'data' => $products,
        'pagination' => [
            'total' => (int)$total,
            'limit' => (int)$limit,
            'offset' => (int)$offset,
            'has_more' => ($offset + $limit) < $total
        ]
    ];
    
    sendJsonResponse($response);
    
} catch (Exception $e) {
    sendJsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
?>
