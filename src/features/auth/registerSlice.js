import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Sākotnējais stāvoklis (state)
const initialState = {
  firstName: '',
  lastName: '',
  birthDate: '',
  email: '',
  password: '',
  isRegistered: false,
  loading: false,
  error: null,
};

// Asinhrona darbība, kas veic reģistrācijas pieprasījumu
export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (data, thunkAPI) => {
    try {
    
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Paziņojam serverim, ka nosūtām JSON datus
        },
        body: JSON.stringify(data),  // Nosūtām datus JSON formātā
      });

      if (!response.ok) {  // Ja serveris atgriež nepareizu statusu
        const errorResponse = await response.json();
        return thunkAPI.rejectWithValue(errorResponse.message || 'Failed to register');  // Atgriežam kļūdu
      }

      const userData = await response.json();  // Saņemam atbildi no servera (lietotāja datus)
      return userData;  // Atgriežam lietotāja datus
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'An error occurred');  // Atgriežam kļūdu, ja kaut kas neizdodas
    }
  }
);

// Redux slice, kas pārvalda reģistrācijas stāvokli
const registerSlice = createSlice({
  name: 'register',  // Slice nosaukums
  initialState,  // Sākotnējais stāvoklis
  reducers: {
    // Reduceris, lai atiestatītu reģistrācijas formu
    resetRegistration: (state) => {
      state.firstName = '';  // Atiestata vārdu
      state.lastName = '';   // Atiestata uzvārdu
      state.email = '';      // Atiestata e-pastu
      state.password = '';   // Atiestata paroli
      state.isRegistered = false;  // Maina reģistrācijas statusu
      state.error = null;    // Noņem kļūdu
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;  // Kad pieprasījums ir uzsākts, iestatām loading uz true
        state.error = null;    // Notīrām kļūdas ziņojumu
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;  // Kad pieprasījums ir veiksmīgs, iestatām loading uz false
        state.isRegistered = true;  // Norādām, ka lietotājs ir veiksmīgi reģistrējies
        state.firstName = action.payload.firstName;  // Saglabājam lietotāja vārdu
        state.lastName = action.payload.lastName;    // Saglabājam uzvārdu
        state.email = action.payload.email;          // Saglabājam e-pastu
        state.error = null;  // Noņemam kļūdu ziņojumu
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;  // Kad pieprasījums ir neizdevies, iestatām loading uz false
        state.isRegistered = false;  // Norādām, ka reģistrācija neizdevās
        state.error = action.payload || 'Registration failed';  // Iestatām kļūdas ziņojumu
      });
  },
});

// Eksportējam reducētājus un selektorus
export const { resetRegistration } = registerSlice.actions;  // Eksportējam `resetRegistration` darbību
export const selectRegistrationState = (state) => state.register;  // Selektors, lai iegūtu visu reģistrācijas stāvokli
export const selectIsRegistered = (state) => state.register.isRegistered;  // Selektors, lai iegūtu reģistrācijas statusu
export const selectRegistrationError = (state) => state.register.error;  // Selektors, lai iegūtu kļūdas ziņojumu
export const selectRegistrationLoading = (state) => state.register.loading;  // Selektors, lai iegūtu loading statusu
export default registerSlice.reducer;  // Eksportējam reducētāju
