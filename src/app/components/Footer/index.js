import './index.css';

function Footer() {

    return (
        <footer>
            <p>
            © {new Date().getFullYear()} Liudas Bagdonas. <a href="https://github.com/LiudasBagdonas/infinite-tree"target="_blank" className="gitHub-link">https://github.com/LiudasBagdonas/infinite-tree.git</a>
            </p>
        </footer>
    );
}

export default Footer;