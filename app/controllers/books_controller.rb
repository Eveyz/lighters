class BooksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_book, only: [:show, :edit, :update, :destroy]
  before_action :set_keywords, only: [:show, :edit]

  # GET /books
  # GET /books.json
  def index
    @books = Book.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @books.pluck(:id, :rlevel, :lslevel, :age, :category, :names) }
    end
  end

  # GET /books/1
  # GET /books/1.json
  def show
  end

  # GET /books/new
  def new
    @book = Book.new
    @keywords = []
  end

  # GET /books/1/edit
  def edit
  end

  # POST /books
  # POST /books.json
  def create
    @book = Book.new(book_params)
    @keywords = params[:keywords]

    respond_to do |format|
      if @book.save
        if @keywords.present?
          @keywords.each do |kw|
            unless kw.empty?
              keyword = Keyword.new
              keyword.content = kw
              keyword.book_id = @book.id
              keyword.save
            end
          end
        end
        format.html { redirect_to books_url, notice: 'Book was successfully created.' }
        format.json { render :show, status: :created, location: @book }
      else
        format.html { render :new }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /books/1
  # PATCH/PUT /books/1.json
  def update
    @keywords = []
    respond_to do |format|
      if @book.update(book_params)
        @book.keywords.destroy_all
        @keywords = params[:keywords]
        unless @keywords.empty?
          @keywords.each do |kw|
            unless kw.empty?
              keyword = Keyword.new
              keyword.content = kw
              keyword.book_id = @book.id
              keyword.save
            end
          end
        end
        format.html { redirect_to books_url, notice: 'Book was successfully updated.' }
        format.json { render :show, status: :ok, location: @book }
      else
        format.html { render :edit }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /books/1
  # DELETE /books/1.json
  def destroy
    @book.destroy
    respond_to do |format|
      format.html { redirect_to books_url, notice: 'Book was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_book
      @book = Book.find(params[:id])
    end

    def set_keywords
      @keywords = @book.keywords.pluck(:content)
    end

    def require_admin
      unless current_user.admin?
        redirect_to root_path
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def book_params
      params.require(:book).permit(:rlevel, :lslevel, :age, :category, :names, :quantity, :links, :audio, :rcomments, :bcomments, files: [])
    end
end
