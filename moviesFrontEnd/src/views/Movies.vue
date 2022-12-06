<script>
    import MovieService from '@/Services/MovieService.js';

    export default {
        name: 'Movies',
        data(){

            return {
                movie: {}
            }
        },
        created(){
            this.getSearchResult('Star Wars')
        },
        methods: {
            async getSearchResult('Star Wars'){
                .then(
                    (event => {
                        this.$set(this, "event", event);
                    }).bind(this)
                )
            }
        }
    }

</script>