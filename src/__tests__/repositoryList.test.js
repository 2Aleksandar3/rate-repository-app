import React from "react";
import { render, screen, within } from "@testing-library/react-native";
import { RepositoryListContainer } from "../components/RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = screen.getAllByTestId("repositoryItem");
      expect(repositoryItems).toHaveLength(2);

      const [first, second] = repositoryItems;

      const formatThousands = (num) =>
        num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();

      expect(within(first).getByText("jaredpalmer/formik")).toBeTruthy();
      expect(
        within(first).getByText("Build forms in React, without the tears")
      ).toBeTruthy();
      expect(within(first).getByText("TypeScript")).toBeTruthy();
      expect(within(first).getByText(formatThousands(1619))).toBeTruthy();
      expect(within(first).getByText(formatThousands(21856))).toBeTruthy();
      expect(within(first).getByText("88")).toBeTruthy();
      expect(within(first).getByText("3")).toBeTruthy();

      expect(
        within(second).getByText("async-library/react-async")
      ).toBeTruthy();
      expect(
        within(second).getByText("Flexible promise-based React data loader")
      ).toBeTruthy();
      expect(within(second).getByText("JavaScript")).toBeTruthy();
      expect(within(second).getByText(formatThousands(69))).toBeTruthy();
      expect(within(second).getByText(formatThousands(1760))).toBeTruthy();
      expect(within(second).getByText("72")).toBeTruthy();
      expect(within(second).getByText("3")).toBeTruthy();
    });
  });
});
