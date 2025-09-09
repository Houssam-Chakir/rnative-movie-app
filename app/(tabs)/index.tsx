import MovieCard from "@/components/Movie-card";
import SearchBar from "@/components/Search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: "" }));

  console.log("movies: ", movies);
  console.log("movies type: ", typeof movies);
  console.log("movies length: ", movies?.length);
  console.log("movies results: ", movies?.results);
  console.log("loading: ", moviesLoading);
  console.log("error: ", moviesError);

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='absolute w-full z-0' />
      <ScrollView
        className='flex-1 px-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className='w-12 h-10 mt-20 mx-auto' />
        {/* is page loading movies */}
        {moviesLoading ? (
          <ActivityIndicator size={"large"} color={"#0000ff"} className='mt-10 self-center' />
        ) : moviesError ? (
          // if yes: show error
          <Text className='text-white'>Error: {moviesError?.message}</Text>
        ) : (
          // if no: render movies
          <View className='flex-1 mt-5'>
            <SearchBar onPress={() => router.push("/search")} placeholder={"Search for a movie"} />
            <Text className='text-lg text-white font-bold mt-5 mb-3'>Latest movies:</Text>
            {/* movies list */}
            <FlatList
              data={movies?.results || []}
              renderItem={({ item }) => <MovieCard {...item} />}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
