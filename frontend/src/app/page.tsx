"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { format } from "date-fns"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Article {
  id: string
  product: string
  description: string
  price: string
  UpdateTime: string
}

export default function Page() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`https://68301becf504aa3c70f6541a.mockapi.io/articles`, {
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        })

        setArticles(response.data)

        // Calculate total pages based on total count
        // If the API doesn't provide a total count, we'll estimate based on whether we got a full page
        const totalCount = Number.parseInt(response.headers["x-total-count"] || "0")
        if (totalCount) {
          setTotalPages(Math.ceil(totalCount / itemsPerPage))
        } else {
          // If we don't have a total count header, estimate based on current results
          setTotalPages(response.data.length < itemsPerPage ? currentPage : currentPage + 1)
        }
      } catch (error) {
        console.error("Error fetching articles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number.parseFloat(price))
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy HH:mm")
    } catch (e) {
      return dateString
    }
  }

  const renderPagination = () => {
    const pages = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={currentPage === i} onClick={() => handlePageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {startPage > 1 && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
              </PaginationItem>
              {startPage > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}

          {pages}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Home</h1>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableCaption>List of products</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead className="hidden md:table-cell">Description</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="hidden md:table-cell">Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articles.length > 0 ? (
                      articles.map((article) => (
                        <TableRow key={article.id}>
                          <TableCell className="font-medium">{article.id}</TableCell>
                          <TableCell>{article.product}</TableCell>
                          <TableCell className="hidden md:table-cell max-w-xs truncate">
                            {article.description}
                          </TableCell>
                          <TableCell>{formatPrice(article.price)}</TableCell>
                          <TableCell className="hidden md:table-cell">{formatDate(article.UpdateTime)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          No products found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex justify-center">{renderPagination()}</div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
