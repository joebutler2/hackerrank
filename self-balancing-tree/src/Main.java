public class Main {

    static class Node {
       int val;   //Value
       int ht;      //Height
       Node left;   //Left child

       Node right;   //Right child
    }


    static Node insert(Node root,int val)
    {

        return _insert(root, val);
    }

    static Node _insert(Node root,int val) {
        if(root == null) {
            root = new Node();
            root.val = val;
            root.ht = 0;
            return root;
        }
        if(val <= root.val) {
            root.left = _insert(root.left, val);
        } else if(val > root.val) {
            root.right = _insert(root.right, val);
        }
        root.ht = 1 + Math.max(height(root.left), height(root.right));
        return balance(root);
    }

    static Node balance(Node root) {
        // right left
        if(balanceFactor(root) < -1) {
            // right right
            if(balanceFactor(root.right) > 0) {
                root.right = rotateRight(root.right);
            }
            root = rotateLeft(root);
        }
        // left right
        else if(balanceFactor(root) > 1) {
            // left left
            if(balanceFactor(root.left) < 0) {
                root.left = rotateLeft(root.left);
            }
            root = rotateRight(root);
        }

        return root;
    }

    static Node rotateRight(Node root) {
        Node pivot = root.left;
        root.left = pivot.right;
        pivot.right = root;
        root.ht = 1 + Math.max(height(root.left), height(root.right));
        pivot.ht = 1 + Math.max(height(pivot.left), height(pivot.right));
        return pivot;
    }

    static Node rotateLeft(Node root) {
        Node pivot = root.right;
        root.right = pivot.left;
        pivot.left = root;
        root.ht = 1 + Math.max(height(root.left), height(root.right));
        pivot.ht = 1 + Math.max(height(pivot.left), height(pivot.right));
        return pivot;
    }

    static int balanceFactor(Node root) {
        return height(root.left) - height(root.right);
    }

    static int height(Node node) {
        if(node == null)
            return -1;
        return node.ht;
    }

    public static void main(String[] args) {
        System.out.println("Hello World!");
        // 3 2 4 5
        Node root = insert(null, 3);
        root = insert(root, 2);
        root = insert(root, 4);
        root = insert(root, 5);
        root = insert(root, 6);
        System.out.print(root);
    }
}
