import menIcon from "../assets/category-men.svg";
import womenIcon from "../assets/category-women.svg";
import kidsIcon from "../assets/category-kids.svg";
import electronicsIcon from "../assets/category-electronics.svg";
import beautyIcon from "../assets/category-beauty.svg";
import homeIcon from "../assets/category-home.svg";

const CHILD_CATEGORY_ALIAS = {
  skincare: ["skin-care"],
  "women accessories": ["womens-bags", "womens-jewellery", "womens-watches"],
  smartwatches: ["mens-watches", "womens-watches"],
};

const toSlug = (value) => (value || "").toLowerCase().trim();

const expandChildCategory = (value) => {
  const key = toSlug(value);
  return CHILD_CATEGORY_ALIAS[key] || [key];
};

export const PARENT_CATEGORIES = [
  {
    key: "men",
    label: "Men",
    image: menIcon,
    children: ["mens-shirts", "mens-shoes", "mens-watches"],
    keywords: [],
  },
  {
    key: "women",
    label: "Women",
    image: womenIcon,
    children: ["womens-dresses", "womens-shoes", "womens-bags", "womens-jewellery"],
    keywords: ["women", "womens", "female"],
    fallbackChildren: ["tops"],
  },
  {
    key: "kids",
    label: "Kids",
    image: kidsIcon,
    children: ["tops"],
    keywords: ["kids", "kid", "child", "children", "baby", "toddler", "girls", "boys"],
    fallbackChildren: ["mens-shirts", "womens-dresses"],
  },
  {
    key: "electronics",
    label: "Electronics",
    image: electronicsIcon,
    children: ["smartphones", "laptops", "smartwatches"],
    keywords: ["electronics", "gadget", "device"],
  },
  {
    key: "beauty",
    label: "Beauty",
    image: beautyIcon,
    children: ["skincare", "fragrances", "women accessories"],
    keywords: ["beauty", "makeup", "cosmetic", "skin-care"],
  },
  {
    key: "home",
    label: "Home",
    image: homeIcon,
    children: ["groceries", "furniture", "home-decoration"],
    keywords: ["home", "kitchen"],
  },
];

const productMatchesKeywords = (product, keywords) => {
  if (!keywords?.length) return false;
  const haystack =
    `${product?.title || ""} ${product?.description || ""} ${product?.category || ""}`.toLowerCase();
  return keywords.some((keyword) => haystack.includes(toSlug(keyword)));
};

const filterByChildren = (products, children = []) => {
  if (!children.length) return [];
  const childSet = new Set(children.flatMap(expandChildCategory).map(toSlug));
  return products.filter((product) => childSet.has(toSlug(product?.category)));
};

const uniqById = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    if (!item?.id) return false;
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

export const getParentCategoryByKey = (key) =>
  PARENT_CATEGORIES.find((item) => item.key === key) || null;

export const filterProductsByParentCategory = (products, parentKey) => {
  if (parentKey === "all") return products;
  const parentCategory = getParentCategoryByKey(parentKey);
  if (!parentCategory) return products;

  const fromChildren = filterByChildren(products, parentCategory.children);
  const fromKeywords = products.filter((product) =>
    productMatchesKeywords(product, parentCategory.keywords)
  );

  const primaryResult = uniqById([...fromChildren, ...fromKeywords]);
  if (primaryResult.length > 0) return primaryResult;

  return uniqById(filterByChildren(products, parentCategory.fallbackChildren || []));
};
