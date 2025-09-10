<?php


require_once '../../index.php';

try {
    $input = getJsonInput();
    
    // Validate required fields
    $required_fields = ['first_name', 'last_name', 'email', 'password'];
    foreach ($required_fields as $field) {
        if (!isset($input[$field]) || empty($input[$field])) {
            sendJsonResponse(['success' => false, 'error' => ucfirst($field) . ' is required'], 400);
        }
    }
    
    $first_name = trim($input['first_name']);
    $last_name = trim($input['last_name']);
    $email = trim($input['email']);
    $password = $input['password'];
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendJsonResponse(['success' => false, 'error' => 'Invalid email format'], 400);
    }
    
    // Validate password strength
    if (strlen($password) < 6) {
        sendJsonResponse(['success' => false, 'error' => 'Password must be at least 6 characters long'], 400);
    }
    
    $pdo = getDatabaseConnection();
    
    // Check if user already exists
    $checkSql = "SELECT id FROM users WHERE email = :email";
    $checkStmt = $pdo->prepare($checkSql);
    $checkStmt->execute([':email' => $email]);
    
    if ($checkStmt->fetch()) {
        sendJsonResponse(['success' => false, 'error' => 'User with this email already exists'], 409);
    }
    
    // Hash password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert new user
    $sql = "INSERT INTO users (first_name, last_name, email, password, created_at) 
            VALUES (:first_name, :last_name, :email, :password, NOW())";
    
    $stmt = $pdo->prepare($sql);
    $result = $stmt->execute([
        ':first_name' => $first_name,
        ':last_name' => $last_name,
        ':email' => $email,
        ':password' => $hashed_password
    ]);
    
    if ($result) {
        $user_id = $pdo->lastInsertId();
        
        $response = [
            'success' => true,
            'data' => [
                'user' => [
                    'id' => $user_id,
                    'email' => $email,
                    'first_name' => $first_name,
                    'last_name' => $last_name
                ],
                'message' => 'User registered successfully'
            ]
        ];
        
        sendJsonResponse($response, 201);
    } else {
        sendJsonResponse(['success' => false, 'error' => 'Failed to create user'], 500);
    }
    
} catch (Exception $e) {
    sendJsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
?>
