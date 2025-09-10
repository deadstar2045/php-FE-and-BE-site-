<?php


require_once '../../index.php';

try {
    $input = getJsonInput();
    
    if (!$input || !isset($input['email']) || !isset($input['password'])) {
        sendJsonResponse(['success' => false, 'error' => 'Email and password are required'], 400);
    }
    
    $email = $input['email'];
    $password = $input['password'];
    
    $pdo = getDatabaseConnection();
    
    // Check if user exists
    $sql = "SELECT * FROM users WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user || !password_verify($password, $user['password'])) {
        sendJsonResponse(['success' => false, 'error' => 'Invalid email or password'], 401);
    }
    
    // Generate a simple token (in production, use JWT)
    $token = base64_encode($user['id'] . ':' . time());
    
    // Update last login
    $updateSql = "UPDATE users SET last_login = NOW() WHERE id = :id";
    $updateStmt = $pdo->prepare($updateSql);
    $updateStmt->execute([':id' => $user['id']]);
    
    $response = [
        'success' => true,
        'data' => [
            'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name']
            ],
            'token' => $token
        ]
    ];
    
    sendJsonResponse($response);
    
} catch (Exception $e) {
    sendJsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
?>
