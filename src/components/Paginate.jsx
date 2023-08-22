"use client";


import Link from "next/link";
import styles from "@/styles/Paginate.module.css"; // Import your custom styles

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  const pageNumbers = [...Array(pages).keys()].map((x) => x + 1);

  return (
    pages > 1 && (
      <div className={styles.paginationContainer}>
        <ul className={styles.pagination}>
          {pageNumbers.map((pageNumber) => (
            <li
              key={pageNumber}
              className={page === pageNumber ? styles.active : ""}
            >
              <Link
                href={
                  !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${pageNumber}`
                      : `/page/${pageNumber}`
                    : `/admin/productList/${pageNumber}`
                }
                scroll={false}
              >
                <span className={styles.pageLink}>{pageNumber}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Paginate;
