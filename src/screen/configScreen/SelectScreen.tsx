// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { fetchCategories } from '../../store/triviaApi';
// import { RootState } from '../../store/store';
// import { Category } from '../../store/triviaApi';
// import { useAppDispatch } from '../../store/hooks';

// export const StartScreen = () => {
//   const dispatch = useAppDispatch();
//   const { categories, loading, error } = useSelector((state: RootState) => state.categories);

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   if (loading) return <div>Loading categories...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <div>
//         <div>
//           <input type='text' />
//         </div>
//         <div>
//           <select>
//             <option value=''>Select a category</option>
//             {categories.map((category: Category) => (
//               <option key={category.id} value={category.id}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <select name='difficulty' id=''></select>
//         </div>
//         <div>
//           <select name='type' id=''></select>
//         </div>
//         <div>
//           <select name='time' id=''></select>
//         </div>
//       </div>
//       <div>
//         <button>Start</button>
//         <button>See my stats</button>
//       </div>
//     </div>
//   );
// };

// import React from 'react';
// import { useGetCategoriesQuery } from '../../store/triviaApi';

// export const CategoryList: React.FC = () => {
//   const { data: categories, error, isLoading } = useGetCategoriesQuery();

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading categories</p>;

//   return <ul>{categories?.map((category) => <li key={category.id}>{category.name}</li>)}</ul>;
// };
