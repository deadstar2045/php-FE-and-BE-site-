<?php


// Enable CORS for frontend communication
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Simple routing
$request_uri = $_SERVER['REQUEST_URI'];
$request_method = $_SERVER['REQUEST_METHOD'];

// Remove query string from URI
$path = parse_url($request_uri, PHP_URL_PATH);

// Route handling
switch ($path) {
    case '/api/products':
        if ($request_method === 'GET') {
            include 'api/products.php';
        }
        break;
        
    case '/api/products/':
        if ($request_method === 'GET') {
            include 'api/product_detail.php';
        }
        break;
        
    case '/api/auth/login':
        if ($request_method === 'POST') {
            include 'api/auth/login.php';
        }
        break;
        
    case '/api/auth/register':
        if ($request_method === 'POST') {
            include 'api/auth/register.php';
        }
        break;
        
    case '/api/cart':
        if ($request_method === 'GET') {
            include 'api/cart/get.php';
        } elseif ($request_method === 'POST') {
            include 'api/cart/add.php';
        }
        break;
        
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
        break;
}

// Database connection function
function getDatabaseConnection() {
    $host = 'localhost';
    $dbname = 'ecommerce_db';
    $username = 'root';
    $password = '';
    
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
        exit();
    }
}

// Helper function to get JSON input
function getJsonInput() {
    $input = file_get_contents('php://input');
    return json_decode($input, true);
}

// Helper function to send JSON response
function sendJsonResponse($data, $status_code = 200) {
    http_response_code($status_code);
    echo json_encode($data);
    exit();
}
?>
