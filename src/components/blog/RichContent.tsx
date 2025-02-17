import React from "react"
import Image from "next/image"
import Link from "next/link"
import type { Image as ImageType } from "../../../types/blog"
import type { JSX } from "react"
import "tailwindcss/tailwind.css"

interface RichContentProps {
  content: any // The content structure from the API
}

export default function RichContent({ content }: RichContentProps) {
  const renderNode = (node: any, index: number): JSX.Element | JSX.Element[] | string | null => {
    if (!node) return null

    if (typeof node === "string") return node

    if (Array.isArray(node)) {
      return <>{node.map((child, childIndex) => renderNode(child, childIndex))}</>
    }

    const key = `${node.type}-${index}`

    switch (node.type) {
      case "paragraph":
        // Check if the paragraph contains an iframe
        const hasIframe = node.children?.some(
          (child: any) => child.type === "text" && child.text.startsWith("<iframe") && child.text.endsWith("</iframe>"),
        )

        if (hasIframe) {
          // If there's an iframe, render each child separately
          return (
            <React.Fragment key={key}>
              {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
            </React.Fragment>
          )
        } else {
          // If no iframe, render as a normal paragraph
          return (
            <p key={key} className={`mb-4 ${node.format === "center" ? "text-center" : ""}`}>
              {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
            </p>
          )
        }

      case "text":
        if (node.text.startsWith("<iframe") && node.text.endsWith("</iframe>")) {
          const srcMatch = node.text.match(/src="([^"]*)"/)
          const titleMatch = node.text.match(/title="([^"]*)"/)
          const widthMatch = node.text.match(/width="([^"]*)"/)
          const heightMatch = node.text.match(/height="([^"]*)"/)

          const src = srcMatch ? srcMatch[1] : ""
          const title = titleMatch ? titleMatch[1] : "Embedded content"
          const width = widthMatch ? widthMatch[1] : "560"
          const height = heightMatch ? heightMatch[1] : "315"

          return (
            <div key={key} className="my-4" style={{ maxWidth: "100%", width: width, margin: "0 auto" }}>
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
                <iframe
                  src={src}
                  title={title}
                  width={width}
                  height={height}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )
        }
        let className = ""
        if (node.format & 1) className += "font-bold "
        if (node.format & 2) className += "italic "
        if (node.format & 8) className += "underline "

        return (
          <span key={key} className={className}>
            {node.text}
          </span>
        )

      case "heading":
        const HeadingTag = `h${node.tag.slice(1)}` as keyof JSX.IntrinsicElements
        return (
          <HeadingTag key={key} className="font-bold mb-4 mt-6">
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </HeadingTag>
        )

      case "list":
        const ListTag = node.tag as "ul" | "ol"
        return (
          <ListTag key={key} className={`mb-4 ml-6 ${node.tag === "ul" ? "list-disc" : "list-decimal"}`}>
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </ListTag>
        )

      case "listitem":
        return (
          <li key={key}>{node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}</li>
        )

      case "link":
        return (
          <Link
            key={key}
            href={node.fields.url}
            className="text-blue-950 hover:underline"
            target={node.fields.newTab ? "_blank" : undefined}
          >
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </Link>
        )

      case "block":
        if (node.fields.blockType === "mediaBlock") {
          const media = node.fields.media as ImageType
          return (
            <figure key={key} className="my-8">
              <Image
                src={media.thumbnailURL || "/placeholder.svg"}
                alt={media.alt || ""}
                width={media.width}
                height={media.height}
                className="rounded-lg mx-auto"
                loading="lazy"
              />
              {media.caption && (
                <figcaption className="text-sm text-center mt-2 text-gray-600">
                  {renderNode((media.caption as any).root, 0)}
                </figcaption>
              )}
            </figure>
          )
        }
        return null

      case "table":
        return (
          <div key={key} className="my-8 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {node.children[0] && (
                  <tr>
                    {node.children[0].children.map((cell: any, cellIndex: number) => (
                      <th key={`th-${cellIndex}`} className="px-6 py-4 whitespace-nowrap text-sm font-bold text-left">
                        {cell.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
                      </th>
                    ))}
                  </tr>
                )}
              </thead>
              <tbody className="divide-y divide-gray-200">
                {node.children?.slice(1).map((row: any, rowIndex: number) => (
                  <tr key={`tr-${rowIndex}`}>
                    {row.children?.map((cell: any, cellIndex: number) => (
                      <td key={`td-${rowIndex}-${cellIndex}`} className="px-6 py-4 whitespace-nowrap text-sm">
                        {cell.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )

      default:
        if (node.children) {
          return (
            <React.Fragment key={key}>
              {node.children.map((child: any, childIndex: number) => renderNode(child, childIndex))}
            </React.Fragment>
          )
        }
        return null
    }
  }

  return <div className="prose max-w-none">{renderNode(content, 0)}</div>
}

