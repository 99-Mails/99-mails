// import type { Address } from "../domains/Address";
// import { useDeleteAddress } from "../services/api";

// function useDeleteAddressFromSession() {
//   const [deleteAddress, { data: addressWithRestoreKey, error }] =
//     useDeleteAddress();

//   async function doDeleteAddress(address: Address) {
//     try {
//       await deleteAddress({
//         variables: { input: { addressId: address.id } },
//       });
//     } catch (e) {
//       throw new Error(error?.message);
//     }
//   }

//   return {
//     doDeleteAddress,
//   };
// }

// export default useDeleteAddressFromSession;
